// File: app/api/admin/refunds/[id]/process/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendMail } from "@/lib/email";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Security Check: Ensure User is Admin
    const user = await getCurrentUser();
    
    // Note: Ensure your User model has a 'role' field as per previous steps
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { status } = await req.json(); // Expects "APPROVED" or "REJECTED"
    const refundId = params.id;

    // 2. Update the Refund Status in Database
    const refund = await prisma.refund.update({
      where: { id: refundId },
      data: { 
        status,
        processedAt: new Date()
      },
      include: {
        booking: {
          include: {
            user: true // We need the user to get their email
          }
        }
      }
    });

    // 3. Send the Email Notification
    const userEmail = refund.booking.user.email;
    const userName = refund.booking.user.name || "Traveler";
    const tripDetails = `${refund.booking.fromCity} to ${refund.booking.toCity}`;

    let subject = "";
    let htmlContent = "";

    if (status === "APPROVED") {
      subject = "🎉 Your Refund has been Approved!";
      htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Great news, ${userName}!</h2>
          <p>Your refund request for the trip <b>${tripDetails}</b> has been <b>APPROVED</b>.</p>
          <p style="font-size: 18px;"><b>Amount: ₹${refund.estimatedAmount}</b></p>
          <p>The amount will be credited to your original payment method (or wallet) within 5-7 business days.</p>
          <hr />
          <p style="font-size: 12px; color: #666;">TrueTrip Team</p>
        </div>
      `;
    } else if (status === "REJECTED") {
      subject = "Your Refund Request has been Rejected";
      htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hello ${userName},</h2>
          <p>We reviewed your refund request for the trip <b>${tripDetails}</b>.</p>
          <p>Unfortunately, your request has been <b>REJECTED</b> as it falls outside the operator's cancellation policy.</p>
          <p><i>Note: ${refund.policyNote || "Cancellation was too close to departure time."}</i></p>
          <p>If you believe this is a mistake, please reply to this email.</p>
          <hr />
          <p style="font-size: 12px; color: #666;">TrueTrip Team</p>
        </div>
      `;
    }

    // Fire and forget email sending
    if (userEmail) {
      await sendMail({
        to: userEmail,
        subject: subject,
        html: htmlContent,
      });
    }

    return NextResponse.json({ success: true, refund });

  } catch (error) {
    console.error("Admin refund processing error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}