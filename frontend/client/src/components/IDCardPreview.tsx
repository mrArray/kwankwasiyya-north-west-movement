import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { APP_LOGO } from "@/const";
import { Supporter, getImageUrl, api } from "@/lib/api";
import { Calendar, CheckCircle, MapPin } from "lucide-react";

interface IDCardPreviewProps {
  supporter: Supporter;
  showQR?: boolean;
}

export default function IDCardPreview({ supporter, showQR = true }: IDCardPreviewProps) {
  // Generate QR code URL for the registration number
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `REG:${supporter.registrationNumber}`
  )}`;
  const cardRef = useRef<HTMLDivElement>(null);


  // Backend download handlers
  const handleBackendDownload = async (type: 'pdf' | 'image') => {
    const url = api.getExportUrl(supporter.registrationNumber, type);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${supporter?.registrationNumber}_idcard.${type === 'pdf' ? 'pdf' : 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert(`Failed to download ${type}. Try again or check your backend.`);
    }
  };

  return (
    <>

      <div ref={cardRef}>
        <Card className="w-full max-w-2xl mx-auto overflow-hidden" style={{background: 'linear-gradient(135deg, #fff5f5 0%, #fdeaea 100%)', border: '4px solid #e53935'}}>
      {/* Header */}
      <div style={{background: 'linear-gradient(90deg, #e53935 0%, #b71c1c 100%)', color: '#fff', padding: '1rem 1.5rem'}}>
        <div className="flex items-center justify-between">
          <img src={APP_LOGO} alt="Logo" className="h-16 w-16 rounded-full object-cover border-2 border-primary-foreground" />
          <div className="text-center flex-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide">KWANKWASIYYA</h2>
            <p className="text-sm md:text-base font-semibold">NORTHWEST MOVEMENT</p>
          </div>
          <img src={APP_LOGO} alt="Logo" className="h-16 w-16 rounded-full object-cover border-2 border-primary-foreground" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: Verification Badge */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center h-24 w-24 md:h-32 md:w-32 rounded-full" style={{background: 'rgba(229, 57, 53, 0.13)'}}>
              <CheckCircle className="h-16 w-16 md:h-20 md:w-20" style={{color: '#e53935'}} strokeWidth={3} />
            </div>
          </div>

          {/* Center: Photo and Details */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #fff5f5 0%, #fdeaea 100%)', borderRadius: '0.5rem', transform: 'rotate(3deg)'}} />
              <img
                src={getImageUrl(supporter.photoUrl)}
                alt={supporter.fullName}
                className="relative h-48 w-40 md:h-56 md:w-48 object-cover rounded-lg border-4 border-white shadow-lg"
              />
            </div>

            {/* Registration Number Badge */}
            <div className="relative">
              <div className="absolute inset-0" style={{background: '#e53935', borderRadius: '50%', transform: 'rotate(-6deg)'}} />
              <div className="relative bg-white rounded-full px-6 py-3" style={{border: '4px solid #e53935', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                <p className="text-xs font-semibold text-muted-foreground text-center">REG NO</p>
                <p className="text-xl md:text-2xl font-bold text-center" style={{color: '#e53935'}}>
                  {supporter.registrationNumber.split('-')[1] || supporter.registrationNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Right: QR Code */}
          {showQR && (
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-3 rounded-lg" style={{border: '4px solid #e53935', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="h-24 w-24 md:h-32 md:w-32"
                />
              </div>
            </div>
          )}
        </div>

        {/* Name Section */}
        <div className="mt-6 bg-white rounded-full px-6 py-4" style={{border: '4px solid #e53935', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
          <p className="text-xl md:text-2xl font-bold text-center uppercase tracking-wide" style={{color: '#e53935'}}>
            {supporter.fullName}
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3" style={{background: 'rgba(229,57,53,0.13)', borderRadius: '12px', padding: '16px 24px', border: '2px solid #e5393520'}}>
            <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{background: 'rgba(229,57,53,0.13)'}}>
              <MapPin className="h-5 w-5" style={{color: '#e53935'}} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Location</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {supporter.ward}, {supporter.LG}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3" style={{background: 'rgba(229,57,53,0.13)', borderRadius: '12px', padding: '16px 24px', border: '2px solid #e5393520'}}>
            <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{background: 'rgba(229,57,53,0.13)'}}>
              <Calendar className="h-5 w-5" style={{color: '#e53935'}} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Registered</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {new Date(supporter.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{background: 'linear-gradient(90deg, #e53935 0%, #b71c1c 100%)', color: '#fff', textAlign: 'center', padding: '12px 24px', fontSize: '14px', marginTop: '24px'}}>
        <p className="text-center text-white text-sm font-medium">
          © {new Date().getFullYear()} Kwankwasiyya Movement Northwest. All rights reserved.
        </p>
      </div>
        </Card>
      </div>
  </>
  );
}
