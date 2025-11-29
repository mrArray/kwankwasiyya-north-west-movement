import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import IDCardPreview from "./IDCardPreview";
import { Supporter } from "@/lib/api";

export default function IDCardPreviewModal({ open, onOpenChange, supporter }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supporter: Supporter | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Digital ID Card</DialogTitle>
        </DialogHeader>
        {supporter && <IDCardPreview supporter={supporter} />}
      </DialogContent>
    </Dialog>
  );
}
