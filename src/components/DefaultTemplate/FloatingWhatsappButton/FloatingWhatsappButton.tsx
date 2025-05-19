import { FaWhatsapp } from "react-icons/fa";
import "./base.css";
export default function FloatingWhatsappButton() {
  const phoneNumber = "+5353301720";
  const whatsAppMessage = "Buenas me gustaria saber mas sobre sus productos";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${whatsAppMessage}`}
      className="FloatingWhatsappButton"
    >
      <FaWhatsapp className="Icon" /> Chat
    </a>
  );
}
