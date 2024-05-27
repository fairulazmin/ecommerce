import { Loader2 } from "lucide-react";

const AdminLoading = () => {
  return (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" size={24} />
    </div>
  );
};

export default AdminLoading;
