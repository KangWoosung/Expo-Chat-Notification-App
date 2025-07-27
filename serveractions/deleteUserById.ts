"use server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function deleteUserById(userId: string) {
  console.log("Server side Deleting user:", userId);
  try {
    await clerkClient.users.deleteUser(userId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
