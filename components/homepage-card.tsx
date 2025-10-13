import { Card, CardFooter, Image, Button, Tooltip } from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import InfoModale from "./InfoModale";
import { useTranslation } from "react-i18next";

export default function HomepageCard({title, description, image, animation}: {title: string, description: string, image: string, animation: string}) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const {t} = useTranslation();
    return (
      <>
        <Card isFooterBlurred className={`border-none ${animation} hover:scale-105`} radius="lg">
          <Image
            alt="Quiz image"
            className="object-cover"
            height={200}
            src={image}
            width={200}
            title={`${title} quiz image`}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-medium font-bold text-white/80">{title}</p>
            {
              !isMobile ?
              <Tooltip
                content={
                    <div className="px-1 py-2">
                    <div className="text-small font-bold">{t("description")}</div>
                    <div className="text-tiny">{description}</div>
                    </div>
                }
                placement="bottom"
              >
                  <Button isIconOnly size="md" variant="light">&#9432;</Button>
              </Tooltip>
              :
              <Button role="button" tabIndex={0} isIconOnly size="md" variant="light" onClick={(e) => {e.stopPropagation(); e.preventDefault(); onOpen();}}>&#9432;</Button>
            }
            
          </CardFooter>
        </Card>

        <InfoModale isOpen={isOpen} onOpenChange={onOpenChange} title={title} info={description} />
      </>
    )
}