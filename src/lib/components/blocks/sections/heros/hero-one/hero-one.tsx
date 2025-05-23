import { Column, Row } from "@/lib/components/layout";
import HSub from "../../../headings/h-sub/h-sub";
import { T } from "@/lib/components/text";
import { StyledBox } from "@/lib/components/structure";

export default function HeroOne({ className }: { className?: string }) {
  return (
    <Row className={`${className} bg-primary py-40 gap-10`} justify="center">
      <Column className="w-[480px] gap-4">
        <HSub
          reverse
          heading="Posiciona a tu equipo para próxima generación."
          subheading="NextGen Devs"
          pt={{
            heading: { textVariant: "hero", severity: "on-primary" },
            subheading: {
              className: "uppercase",
              severity: "primary-container",
            },
          }}
        />
        <T textVariant="body1" size="high">
          Transformamos tus ideas más ambiciosas en soluciones de software
          robustas y escalables. Todo lo que necesitas en un solo lugar.
        </T>
        <Row className="gap-2">
          <StyledBox className="flex items-center justify-center w-[50%] h-[60px] rounded-none">
            Emprende Ahora
          </StyledBox>
          <StyledBox
            className="w-[50%] h-[60px] rounded-none border-3"
            variant="outlined"
          >
            Conoce mas
          </StyledBox>
        </Row>
      </Column>
      <StyledBox className="w-[480px]"></StyledBox>
    </Row>
  );
}
