import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('https://www.boredapi.com/api/activity',{
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    } 
      );
    const data = await response.json()
   
    return NextResponse.json(data)
  }