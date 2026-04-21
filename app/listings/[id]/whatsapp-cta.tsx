import { MessageCircle } from "lucide-react";

function buildWhatsAppUrl(phoneRaw: string, title: string): string {
  const digits = phoneRaw.replace(/\D/g, "");
  if (!digits) return "#";
  const msg = `היי, ראיתי את המודעה שלך ב-MasterTrip לגבי ${title}, אשמח לשמוע פרטים!`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

type Props = {
  whatsappNumber: string;
  listingTitle: string;
  className?: string;
};

export function WhatsAppCta({ whatsappNumber, listingTitle, className = "" }: Props) {
  const href = buildWhatsAppUrl(whatsappNumber, listingTitle);
  const invalid = href === "#";

  if (invalid) {
    return (
      <p className={`rounded-xl bg-rose-50 px-4 py-3 text-center text-sm text-rose-800 ${className}`}>
        מספר וואטסאפ לא זמין במודעה זו.
      </p>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-900/25 transition hover:bg-[#20bd5a] hover:shadow-xl sm:py-4 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      צור קשר בוואטסאפ
    </a>
  );
}
