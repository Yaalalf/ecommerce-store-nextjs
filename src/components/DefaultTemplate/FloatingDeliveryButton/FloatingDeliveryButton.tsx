import { Card, Column, H, T } from "@/lib/components";
import Button from "@/lib/components/button";
import Dialog from "@/lib/components/popups/components/dialog";
import { clsx } from "clsx";
import { MdDeliveryDining } from "react-icons/md";

export default function FloatingDeliveryButton() {
  return (
    <div className={clsx("fixed", "bottom-[60px]", "right-[120px]")}>
      <Button
        className={clsx(
          "FloatingDeliveryButton",
          "text-2xl",
          "h-[48px]",
          "shadow-[0px_3px_6px_#0000003d,_0px_-3px_6px_#0000003d]"
        )}
        icon={<MdDeliveryDining />}
      >
        <Dialog canTriggerParent>
          <Card className="w-[390px] min-w-[360px] ">
            <H className="mb-4">Servicio a Domicilio</H>
            <Column className="gap-3">
              <div>
                <H className="text-md font-bold" type="h3">
                  Habana
                </H>
                <T type="p">
                  Tarifa única 1300 CUP O 3,5 USD a todos los municipios
                </T>
              </div>
              <div>
                <H className="text-md font-bold" type="h3">
                  Capitales de provincias
                </H>
                <T type="p">consultar con nuestros agentes comerciales</T>
              </div>
            </Column>
          </Card>
        </Dialog>
      </Button>
    </div>
  );
}
