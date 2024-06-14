// app/api/sendOrder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { customer, items } = await req.json();

    console.log("Customer Email:", customer.email);

    if (
      !customer.email ||
      typeof customer.email !== "string" ||
      !validateEmail(customer.email)
    ) {
      throw new Error("Invalid email address");
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Resend API key is not set");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const customerEmailHtml = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${customer.name}!</p>
      <p>Here are your order details:</p>
      <ul>
        ${items
          .map(
            (item: any) => `
          <li>
            ${item.product.name} - Quantity: ${item.quantity} - Price: £${item.product.price}
          </li>
        `
          )
          .join("")}
      </ul>
      <p>Total: £${items
        .reduce(
          (total: number, item: any) =>
            total + item.product.price * item.quantity,
          0
        )
        .toFixed(2)}</p>
    `;

    const storeEmailHtml = `
      <h1>New Order Received</h1>
      <p>Customer details:</p>
      <ul>
        <li>Name: ${customer.name}</li>
        <li>Email: ${customer.email}</li>
        <li>Address: ${customer.address}</li>
        <li>Phone: ${customer.phone}</li>
      </ul>
      <p>Order details:</p>
      <ul>
        ${items
          .map(
            (item: any) => `
          <li>
            ${item.product.name} - Quantity: ${item.quantity} - Price: £${item.product.price}
          </li>
        `
          )
          .join("")}
      </ul>
      <p>Total: £${items
        .reduce(
          (total: number, item: any) =>
            total + item.product.price * item.quantity,
          0
        )
        .toFixed(2)}</p>
    `;

    console.log("Sending email to:", customer.email);
    console.log("Email HTML:", customerEmailHtml);

    const customerEmailResult = await resend.emails.send({
      from: "orders@nycontra.com",
      to: customer.email,
      subject: "Order Confirmation",
      html: customerEmailHtml,
    });

    const storeEmailResult = await resend.emails.send({
      from: "orders@nycontra.com",
      to: "yahyaimohamed2000@gmail.com", // Replace with the store's email
      subject: "New Order Received",
      html: storeEmailHtml,
    });

    console.log("Email send result:", customerEmailResult, storeEmailResult);

    return NextResponse.json({
      message: "Email sent successfully",
      customerEmailResult,
      storeEmailResult,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const { customer, items } = await req.json();

//     console.log("Customer Email:", customer.email);

//     if (
//       !customer.email ||
//       typeof customer.email !== "string" ||
//       !validateEmail(customer.email)
//     ) {
//       throw new Error("Invalid email address");
//     }

//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const customerEmailHtml = `
//       <h1>Order Confirmation</h1>
//       <p>Thank you for your order, ${customer.name}!</p>
//       <p>Here are your order details:</p>
//       <ul>
//         ${items
//           .map(
//             (item: any) => `
//           <li>
//             ${item.product.name} - Quantity: ${item.quantity} - Price: £${item.product.price}
//           </li>
//         `
//           )
//           .join("")}
//       </ul>
//       <p>Total: £${items
//         .reduce(
//           (total: number, item: any) =>
//             total + item.product.price * item.quantity,
//           0
//         )
//         .toFixed(2)}</p>
//     `;

//     const customerEmailResult = await resend.emails.send({
//       from: "orders@resend.dev",
//       to: customer.email,
//       subject: "Order Confirmation",
//       html: customerEmailHtml,
//     });

//     return NextResponse.json({
//       message: "Emails sent successfully",
//       customerEmailResult,
//
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json(
//       { message: "Error sending email", error: error },
//       { status: 500 }
//     );
//   }
// }

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
