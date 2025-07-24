

import { createClient } from '@/utils/supabase/client';

export async function createProduct(productData) {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    
    // Append all product data to FormData
    formData.append('img', productData.img);
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('sku', productData.sku);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('category', productData.category);
    
    // Only append discount if it's not null/undefined
    if (productData.discount !== null && productData.discount !== undefined) {
      formData.append('discount', productData.discount);
    }

    const response = await fetch('/api/products/add', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error };
    }

    return { success: true, data: result };

  } catch (error) {
    console.error('API call error:', error);
    return { error: { general: 'Failed to create product. Please try again.' } };
  }
}

// Client-side function to call the API
export async function updateProduct(productData) {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    
    // Append all product data to FormData
    formData.append('img', productData.img);
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('sku', productData.sku);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('category', productData.category);
    
    // Only append discount if it's not null/undefined
    if (productData.discount !== null && productData.discount !== undefined) {
      formData.append('discount', productData.discount);
    }

    const response = await fetch('/api/products/edit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error };
    }

    return { success: true, data: result };

  } catch (error) {
    console.error('API call error:', error);
    return { error: { general: 'Failed to create product. Please try again.' } };
  }
}


export async function deleteProduct(sku) {
  try {
    const supabase = createClient()

    // Get product details
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('sku', sku)
      .single()

    if (fetchError || !product) {
      return { error: 'Product not found' }
    }

    const imageUrl = product.img
    
    if (imageUrl) {
      let imagePath = null;
      
      // Extract path from full Supabase URL
      // if (imageUrl.includes('supabase')) {
        // const urlParts = imageUrl.split('/object/public/')
        // if (urlParts.length > 1) {
          // Remove bucket name from path
          // imagePath = urlParts[1].split('/').slice(1).join('/')
        // }
      // } else {
        // Assume it's already a path
        const urlParts = imageUrl.split('/object/public/product-images/');
        if (urlParts.length > 1) {
          imagePath = urlParts[1]; // e.g., 'shawarma.png' or 'specials/shawarma.png'
        }
      // }

      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('product-images') // Your storage bucket name
          .remove([imagePath])

        if (storageError) {
          console.warn('Image deletion failed:', storageError.message)
        }
      }
    }

    // Delete product from database
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('sku', sku)

    if (deleteError) {
      return { error: 'Failed to delete product from database' }
    }

    // revalidatePath('/menu')
    return { success: true }

  } catch (error) {
    console.error('Delete product error:', error)
    return { error: 'Something went wrong' }
  }
}

export async function addGroup(newGroup) {
  try {
    const supabase = createClient()

    // Get groups
    const { data: group, error: fetchError } = await supabase
  .from('product_groups')
  .select('*')
  .eq('name', newGroup) 
  // .limit(1)



  if (!newGroup || newGroup.length === 0) {
    return { error: "Invalid Name"  }
  }

    if (group) {
      return { error: `This category already exists`  }
      // console.log(group)
    }

    
    // Insert into Supabase DB
    const { error: insertError } = await supabase.from("product_groups").insert([
      {
        name: newGroup
      },
    ]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return { error: "Failed to save." };
    }

    return { success: true };

  } catch (error) {
    console.error('insert group error:', error)
    return { error: 'Something went wrong' }
  }
}


export async function deleteGroup(id, title) {
  try {
    const supabase = createClient()

    // Get products
    const { data: products, error: productsError } = await supabase
  .from('products')
  .select('*')
  .eq('group', title) 
  .limit(1)


    if (products && products.length > 0) {
      return { error: "Cannot delete group with products, kindly move the items to another group first"  }
    }

    
    // Delete product from database
    const { error: deleteError } = await supabase
      .from('product_groups')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return { error: 'Failed to delete group from database' }
    }

    // revalidatePath('/menu')
    return { success: true }

  } catch (error) {
    console.error('Delete product error:', error)
    return { error: 'Something went wrong' }
  }
}