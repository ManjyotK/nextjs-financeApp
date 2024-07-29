"use client";

import {Card, CardBody} from "@nextui-org/react";

export default function DashboardCard({title, value}: {title: string, value: string}) {
  return (
      <Card className="w-fit min-w-64 shadow-xl p-4 m-4" >
        <CardBody className="flex flex-col">
        <p className="text-xl">{title}</p> 
        <p className="font-bold text-3xl">{value}</p>
      </CardBody>
    </Card>
  );
}
