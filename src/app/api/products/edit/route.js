import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const supabase = await createClient();
    const error = {};

    const formData = await request.formData();
    const file = formData.get('img'); // May be null

    const sku = formData.get('sku');
    // if (!sku?.trim()) {
    //   return NextResponse.json({ error: { sku: 'SKU is required for update.' } }, { status: 400 });
    // }

    // Fetch existing product
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('sku', sku)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: { sku: 'Product with this SKU does not exist.' } }, { status: 404 });
    }

    const updated_product = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      quantity: parseInt(formData.get('quantity')),
      discount: formData.get('discount') ? parseFloat(formData.get('discount')) : null,
      category: formData.get('category'),
    };

    // Validate
    if (!updated_product.name?.trim()) error.name = 'Name is required.';
    if (!updated_product.description || updated_product.description.length < 30 || updated_product.description.length > 500)
      error.description = `Description must be 30–500 characters. ${updated_product.description.length}/500`;
    if (isNaN(updated_product.price) || updated_product.price < 1)
      error.price = 'Price must be at least 1.';
    if (isNaN(updated_product.quantity) || updated_product.quantity < 0)
      error.quantity = 'Quantity cannot be negative.';
    if (updated_product.discount !== null && (updated_product.discount < 0 || updated_product.discount > 100))
      error.discount = 'Discount must be between 0 and 100.';
    if (!updated_product.category?.trim()) error.category = 'Category is required.';

    if (Object.keys(error).length) {
      return NextResponse.json({ error }, { status: 400 });
    }

    let newImageUrl = existingProduct.img;

    // Only upload if new file is provided
    if (typeof file !== 'string') {
      const ext = file.name.split('.').pop();
      const fileName = `${sku}.${ext}`;
      const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

      // Delete old image
      const oldPath = existingProduct.img?.split(`/${bucket}/`)[1];
      if (oldPath && oldPath !== fileName) {
        await supabase.storage.from(bucket).remove([oldPath]);
      }

      // Upload new image
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json({ error: { img: 'Failed to upload image.' } }, { status: 500 });
      }

      newImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
    }

    // Update in DB
    const { error: updateError } = await supabase
      .from('products')
      .update({
        img: newImageUrl,
        title: updated_product.name,
        description: updated_product.description,
        price: updated_product.price,
        discount: updated_product.discount,
        count: updated_product.quantity,
        group: updated_product.category,
      })
      .eq('sku', sku);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ error: { db: 'Failed to update product.' } }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: { general: 'An unexpected error occurred.' } }, { status: 500 });
  }
}
