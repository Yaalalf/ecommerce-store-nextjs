import ResourcesPaginatedList from "@/components/Dashboard/ResourcesPaginatedList/ResourcesPaginatedList";
import { IResource } from "@/db/models/resources";
import ResourceServices from "@/db/services/resourceServices";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import FileInput from "@/lib/components/inputs/file-input/file-input";
import { sanitatedClientData } from "@/utils/util";
import { FaFileImage, FaPlusCircle } from "react-icons/fa";

export default async function ResourcesPage() {
  const { getAllResources } = new ResourceServices();
  const resources = sanitatedClientData(await getAllResources()) as IResource[];

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Resources"
          slotAfter={
            <FileInput
              icon={<FaPlusCircle />}
              label="Add Resource"
              apiUrl="/api/resources/upload"
            ></FileInput>
          }
          slotBefore={<FaFileImage />}
        />
      }
      slotBody={
        <ResourcesPaginatedList
          className="mt-4"
          resources={resources}
        ></ResourcesPaginatedList>
      }
    />
  );
}
