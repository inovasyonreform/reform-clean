import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "REFORM",
      src: "/refwhite.png",
    },
   {
      title: "REFORM",
      src: "/refwhite.png",
    },
    {
      title: "REFORM",
      src: "/refwhite.png",
    }
  ];

  return <FocusCards cards={cards} />;
}
