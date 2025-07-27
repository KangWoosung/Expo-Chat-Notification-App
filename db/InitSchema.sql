-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- users table
create table public.users (
  user_id text primary key default auth.jwt()->>'sub',
  name text not null,
  email text not null,
  avatar text,
  push_token text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_users_email on public.users(email);

alter table public.users enable row level security;

-- ✅ 누구나 읽기 가능 (auth 여부 무관)
create policy "Anyone can read users (even anon)"
  on public.users
  for select
  using (true);

-- ✅ 본인만 수정/삭제 가능
create policy "Users can modify their own data"
  on public.users
  for all
  using ((auth.jwt()->>'sub') = (user_id)::text)
  with check ((auth.jwt()->>'sub') = (user_id)::text);



-- chat_rooms table
create table public.chat_rooms (
  room_id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by text references public.users(user_id) on delete cascade,
  created_at timestamptz default now()
);

alter table public.chat_rooms enable row level security;

create policy "Only creator can manage room"
  on public.chat_rooms
  for all
  using ((auth.jwt()->>'sub') = (created_by)::text)
  with check ((auth.jwt()->>'sub') = (created_by)::text);



-- chat_room_members table
create table public.chat_room_members (
  room_id uuid references public.chat_rooms(room_id) on delete cascade,
  user_id text references public.users(user_id) on delete cascade,
  invited_by text references public.users(user_id),
  joined_at timestamptz default now(),
  role text default 'member', -- owner, admin, member
  primary key (room_id, user_id)
);

create index idx_members_user_id on public.chat_room_members(user_id);

alter table public.chat_room_members enable row level security;

create policy "Members can manage their membership"
  on public.chat_room_members
  for all
  using ((auth.jwt()->>'sub') = (user_id)::text)
  with check ((auth.jwt()->>'sub') = (user_id)::text);



-- messages table
create table public.messages (
  message_id uuid primary key default gen_random_uuid(),
  room_id uuid references public.chat_rooms(room_id) on delete cascade,
  sender_id text references public.users(user_id) on delete cascade,
  content text not null,
  sent_at timestamptz default now()
);

create index idx_messages_room_id on public.messages(room_id);

alter table public.messages enable row level security;

create policy "Members can read messages"
  on public.messages
  for select
  using (
    exists (
      select 1 from public.chat_room_members
      where chat_room_members.room_id = messages.room_id
      and chat_room_members.user_id = auth.jwt()->>'sub'
    )
  );

create policy "Sender can insert message"
  on public.messages
  for insert
  with check ((auth.jwt()->>'sub') = (sender_id)::text);



-- message_reads table
create table public.message_reads (
  message_id uuid references public.messages(message_id) on delete cascade,
  user_id text references public.users(user_id),
  read_at timestamptz,
  primary key (message_id, user_id)
);

alter table public.message_reads enable row level security;

create policy "User can track their own reads"
  on public.message_reads
  for all
  using ((auth.jwt()->>'sub') = (user_id)::text)
  with check ((auth.jwt()->>'sub') = (user_id)::text);



-- users_in_room table
create table public.users_in_room (
  uuid uuid primary key default gen_random_uuid(),
  room_id uuid references public.chat_rooms(room_id) on delete cascade,
  user_id text references public.users(user_id),
  entered_at timestamptz default now()
);

create index idx_users_in_room_user_id on public.users_in_room(user_id);

alter table public.users_in_room enable row level security;

create policy "User can manage their presence"
  on public.users_in_room
  for all
  using ((auth.jwt()->>'sub') = (user_id)::text)
  with check ((auth.jwt()->>'sub') = (user_id)::text);



-- notification_pending table
create table public.notification_pending (
  id uuid primary key default gen_random_uuid(),
  user_id text references public.users(user_id),
  expo_payload jsonb not null,
  created_at timestamptz default now()
);

alter table public.notification_pending enable row level security;

create policy "User can access their notifications"
  on public.notification_pending
  for all
  using ((auth.jwt()->>'sub') = (user_id)::text)
  with check ((auth.jwt()->>'sub') = (user_id)::text);

-- 시스템 레벨 접근 (서비스 계정용)
CREATE POLICY "System can manage all notifications" 
	ON notification_pending
  FOR ALL 
  USING (
     (auth.jwt()->>'sub') = 'service'
  );