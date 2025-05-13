"use client";
import { Box, Center, List } from "@/lib/components";
import "./base.css";
import { Beside } from "@/lib/components/structure";

export default function TestPage() {
  const data = [
    { name: "one", value: 0 },
    { name: "two", value: 1 },
  ];

  return (
    <div className="TestPage">
      <Center className="FlexContainer" tag="article" gap="20">
        <List
          data={data}
          direction="column"
          propKey="name"
          pt={{
            root: { onClick: () => console.log("click en la lista") },
            item: {
              onClick: (evt) => {
                evt.stopPropagation();
                console.log("click en un nodo de la lista");
              },
            },
            items: {
              [data[1].name]: {
                onClick: (evt) => {
                  evt.stopPropagation();
                  console.log("click en un nodo de la lista " + data[1].name);
                },
              },
            },
          }}
          slotItems={{ [data[0].name]: () => <div>Hola mundo</div> }}
        >
          {(item) => (
            <Box bordered shadowed>
              <Beside
                align="center"
                before={<Box>antes</Box>}
                after={<Box>despues</Box>}
              >
                {item.name}
              </Beside>
            </Box>
          )}
        </List>
      </Center>
    </div>
  );
}
