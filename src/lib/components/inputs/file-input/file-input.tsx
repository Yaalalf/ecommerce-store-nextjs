"use client";

import { ChangeEvent, useRef, useState } from "react";
import { IFileInputProps } from "./types";
import Button from "../../button";

export default function FileInput({
  className,
  multiple = true,
  apiUrl,
  icon,
  label,
  onChange,
}: IFileInputProps) {
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      setIsLoading(true);
      if (event.target.files && event.target.files.length > 0) {
        if (onChange) {
          await onChange(event.target.files);
        } else {
          await new Promise((resolve, reject) => {
            handleUpload(event.target.files as FileList, resolve, reject);
          });
        }
      } else {
        console.error("No files selected");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleUpload(
    files: FileList,
    resolve: (value: unknown) => void,
    reject: (reason?: Error) => void
  ) {
    const formData = new FormData();

    for (const file of files) {
      formData.append("images", file);
    }
    const req = new XMLHttpRequest();

    req.addEventListener("load", () => {
      try {
        resolve({
          status: req.status,
          statusText: req.statusText,
          responseText: req.responseText,
          response: req.response,
        });
        console.log(JSON.parse(req.response));
      } catch (error) {
        reject(error as Error);
        console.error(error);
      } finally {
      }
    });
    req.open("POST", apiUrl);
    req.send(formData);
  }

  function triggerFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div>
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        accept="image/*"
      />

      <Button
        className={className}
        loading={isLoading}
        icon={icon}
        onClick={triggerFilePicker}
        severity="primary"
        dense
        rounded="md"
      >
        {label}
      </Button>
    </div>
  );
}
