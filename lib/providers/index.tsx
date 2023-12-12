import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationProvider } from "./notificationProvider";

export default function Providers({ children }: React.HTMLAttributes<ReactElement>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </QueryClientProvider>
  )
}