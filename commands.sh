##
## init project
npx create-expo-app@latest . --template default

## expo-notifcation
npx expo install expo-notifications expo-device expo-constants

## Reanimated
npx expo install react-native-reanimated react-native-safe-area-context

## Gesture Handler
npx expo install react-native-gesture-handler

## Drawer
npx expo install @react-navigation/drawer

## SVG
npx expo install react-native-svg


## Tailwind CSS & Reanimated
## Mind the newest versions command string in officials at:
## https://www.nativewind.dev/docs/getting-started/installation
npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install -D tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11

## config Tailwind
npx tailwindcss init
## Wait for user input
echo "Edit Tailwind config files as instructed and press Enter to continue..."
read
## Edit config files as below
## https://until.blog/@ganymedian/-1--react-native-%EC%A4%80%EB%B9%84%EC%9E%91%EC%97%85#79caf909-a753-432a-9116-26a716041601

## Tailwind-Merge & clsx & Class Varience Authority 
npx expo install tailwindcss clsx 
npx expo install tailwind-merge
## 2025-03-17 07:49:57
## cva install occurs an error with npx
npm install class-varience-authority 

## RHF
npx expo install react-hook-form @hookform/resolvers 

## Zod
npx expo install zod

## Zustand
npx expo install zustand



## AsyncStorage
npx expo install @react-native-async-storage/async-storage

npm install expo-zustand-persist


## Clerk
npx expo install @clerk/clerk-expo

## Secure Store
npx expo install expo-secure-store


## Supabase
npx expo install @supabase/supabase-js



