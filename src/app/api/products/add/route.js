// src/app/api/products/route.js
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const supabase = await createClient();

//     const { data: authData, error: authError } = await supabase.auth.getUser()

//     if (authError) {
//         console.error('Auth error:', authError);
//         return NextResponse.json({ error: { db: "Failed to fetch current user" } }, { status: 500 });
//       } else {
// console.log(authData)
//       }
    //   const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

     
    //   if (authData.user.id !== ADMIN_USER_ID) {
    //     return NextResponse.json({ error: { auth: "Unauthorized access." } }, { status: 401 });
    //   }

    const error = {};

    // Parse form data
    const formData = await request.formData();
    
    const new_product = {
      img: formData.get('img'),
      name: formData.get('name'),
      description: formData.get('description'),
      sku: formData.get('sku'),
      price: parseFloat(formData.get('price')),
      quantity: parseInt(formData.get('quantity')),
      discount: formData.get('discount') ? parseFloat(formData.get('discount')) : null,
      category: formData.get('category'),
    };

    // Fetch existing products from product_groups table
    const { data: existing_products, error: fetchError } = await supabase
      .from('products')
      .select('sku');

    if (fetchError) {
      return NextResponse.json({ error: { db: "Failed to fetch existing products." } }, { status: 500 });
    }

    // Validation
    if (!new_product.img || new_product.img.size === 0 || !new_product.img.name) error.img = "Image is required.";
    if (!new_product.name?.trim()) error.name = "Name is required.";
    if (!new_product.description || new_product.description.length < 30 || new_product.description.length > 500)
      error.description = `Description must be 30–500 characters. ${new_product.description.length}/500`;
    if (!new_product.sku?.trim()) error.sku = "SKU is required.";
    else if (existing_products.some(p => p.sku === new_product.sku))
      error.sku = "SKU already exists.";
    if (new_product.price === undefined || isNaN(new_product.price) || new_product.price < 1)
      error.price = "Price must be at least 1.";
    if (isNaN(new_product.quantity) || new_product.quantity < 0)
      error.quantity = "Quantity cannot be negative.";
    if (new_product.discount !== null && (new_product.discount < 0 || new_product.discount > 100))
      error.discount = "Discount must be between 0 and 100.";
    if (!new_product.category?.trim())
      error.category = "Category is required.";

    if (Object.keys(error).length) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Upload to Supabase Storage
    const file = new_product.img;
    const ext = file.name.split(".").pop();
    const fileName = `${new_product.sku}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: { img: "Failed to upload image." } }, { status: 500 });
    }

    const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${fileName}`;

    // Insert into Supabase DB
    const { error: insertError } = await supabase.from("products").insert([
      {
        img: imgUrl,
        sku: new_product.sku,
        title: new_product.name,
        description: new_product.description,
        price: new_product.price,
        discount: new_product.discount,
        count: new_product.quantity,
        group: new_product.category,
      },
    ]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: { db: "Failed to save product." } }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: { general: "An unexpected error occurred." } }, { status: 500 });
  }
}