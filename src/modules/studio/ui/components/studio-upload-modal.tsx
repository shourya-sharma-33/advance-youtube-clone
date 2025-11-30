import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StudioUploadModal = () => {
    return (
        <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Create
        </Button>
    );
};
