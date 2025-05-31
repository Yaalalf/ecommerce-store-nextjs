"use client";
import "./base.css";
import { useEffect, useState } from "react";

import { INotificationItemProps, INotificationProps } from "./types";
import useStyledNotifications from "./use-styled-notifications";
import { Card, List, StyledBox } from "../structure";
import Heading from "../blocks/headings/heading";
import Button from "../button";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function Notifications({
  notifications,
  removeNotification,
  position,
}: INotificationProps) {
  const notificationStyles = useStyledNotifications()({
    position,
  });

  return (
    <List
      data={notifications}
      direction="column"
      propKey="id"
      gap="gap-2"
      className={notificationStyles}
    >
      {(notification) => (
        <NotificationItem
          id={notification.id}
          title={notification.title}
          subtitle={notification.subtitle}
          icon={notification.icon}
          notifyType={notification.notifyType}
          duration={notification.duration}
          onClose={removeNotification}
        >
          {notification.children}
        </NotificationItem>
      )}
    </List>
  );
}

export function NotificationItem({
  title,
  subtitle,
  // icon,
  // children,
  // notifyType,
  duration,
  onClose,
  id,
}: INotificationItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Inicia la desaparición
        // Retrasa la llamada a onClose para permitir la animación de salida
        setTimeout(() => onClose && onClose(id), 500); // 500ms es un ejemplo para la duración de la animación
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(id), 500);
  };

  return (
    <Card
      dense
      variant="surface"
      severity="base"
      elevation="level-4"
      className={` shadow-primary ${
        isVisible ? "notification-item--visible" : "notification-item--hidden"
      }`}
    >
      <Heading
        className="gap-2"
        heading={title}
        subheading={subtitle}
        slotBefore={
          <StyledBox dense className="bg-blue-700 text-white">
            <IoMdInformationCircleOutline />
          </StyledBox>
        }
        slotAfter={
          <Button dense size="md" icon={<IoClose />} onClick={handleClose} />
        }
      />
    </Card>
  );
}
