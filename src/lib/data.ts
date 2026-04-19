export type Service = {
  id: string;
  name: string;
  category: "Hair Care" | "Skin Care" | "Bridal" | "Makeup";
  price: number;
  duration: string;
  description: string;
};

export const defaultServices: Service[] = [
  { id: "h1", name: "Haircut & Styling", category: "Hair Care", price: 600, duration: "45 min", description: "Precision cut tailored to your face shape." },
  { id: "h2", name: "Hair Spa Treatment", category: "Hair Care", price: 1200, duration: "60 min", description: "Deep nourishment for silky, healthy hair." },
  { id: "h3", name: "Hair Coloring", category: "Hair Care", price: 2500, duration: "90 min", description: "Premium global or highlights coloring." },
  { id: "s1", name: "Signature Facial", category: "Skin Care", price: 1500, duration: "60 min", description: "Glow-boosting facial with luxury serums." },
  { id: "s2", name: "Cleanup", category: "Skin Care", price: 800, duration: "45 min", description: "Refresh & deep-cleanse your skin." },
  { id: "s3", name: "De-Tan Therapy", category: "Skin Care", price: 1100, duration: "45 min", description: "Restore even, radiant complexion." },
  { id: "b1", name: "Bridal Glam Package", category: "Bridal", price: 18000, duration: "4 hrs", description: "HD makeup, hairstyle, drape & accessories." },
  { id: "b2", name: "Engagement Look", category: "Bridal", price: 9000, duration: "2.5 hrs", description: "Soft glam for your special evening." },
  { id: "m1", name: "Party Makeup", category: "Makeup", price: 2500, duration: "60 min", description: "Statement looks for every occasion." },
  { id: "m2", name: "HD Airbrush Makeup", category: "Makeup", price: 4500, duration: "75 min", description: "Flawless skin finish with airbrush tech." },
];

export const WHATSAPP_NUMBER = "919999999999";

export const sendToWhatsApp = (message: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

export const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];
