import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  children: React.ReactNode;
  allowedRole?: "customer" | "dispensary_owner";
};

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const role = data.session.user.user_metadata?.role;

      if (!allowedRole || role === allowedRole) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setLoading(false);
    };

    checkAccess();
  }, [allowedRole]);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}