import { Card, CardFooter, Image, Button, Tooltip } from "@heroui/react";

export default function HomepageCard({title, description, image}: {title: string, description: string, image: string}) {
    return (
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Quiz image"
            className="object-cover"
            height={200}
            src={image}
            width={200}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">{title}</p>
            <Tooltip
                content={
                    <div className="px-1 py-2">
                    <div className="text-small font-bold">Description</div>
                    <div className="text-tiny">{description}</div>
                    </div>
                }
                placement="bottom"
            >
                <Button isIconOnly size="md" variant="light">&#9432;</Button>
            </Tooltip>
          </CardFooter>
        </Card>
    )
}