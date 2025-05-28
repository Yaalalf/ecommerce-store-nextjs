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
}: IFileInputProps) {
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    if (event.target.files && event.target.files.length > 0) {
      handleUpload(event.target.files);
    } else {
      console.error("No files selected");
    }
  }

  function handleUpload(files: FileList) {
    const formData = new FormData();

    for (const file of files) {
      formData.append("images", file);
    }
    const req = new XMLHttpRequest();

    req.addEventListener("load", () => {
      try {
        console.log(JSON.parse(req.response));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    });
    req.open("POST", apiUrl);
    req.send(formData);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      >
        {label}
      </Button>
    </div>
  );
}
