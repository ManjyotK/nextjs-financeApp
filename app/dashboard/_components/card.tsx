"use client";

import {Card, CardBody} from "@nextui-org/react";

/**
 * DashboardCard component.
 *
 * A card component that displays a title and a value.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the card.
 * @param {string} props.value - The value of the card.
 * @return {JSX.Element} The rendered card component.
 */
export default function DashboardCard({title, value}: {title: string, value: string}) {
  return (
    // The root element of the card
    <Card className="w-fit min-w-64 shadow-xl p-4 m-4">
      {/* The body of the card */}
      <CardBody className="flex flex-col">
        {/* The title of the card */}
        <p className="text-xl">{title}</p> 
        {/* The value of the card */}
        <p className="font-bold text-3xl">{value}</p>
      </CardBody>
    </Card>
  );
}
