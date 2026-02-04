from PIL import Image, ImageDraw, ImageFont

# Create placeholder PNG files
companies = [
    ("iconocliente1.png", "Innovatech", "#1E3A8A"),
    ("iconocliente2.png", "EcoLogistics", "#065F46"),
    ("iconocliente3.png", "Precision Group", "#7C2D12"),
    ("iconocliente4.png", "GreenSolutions", "#4B5563"),
    ("iconocliente5.png", "VentureCorp", "#5B21B6"),
    ("iconoempresa.png", "Empresas", "#D4AF37"),
]

for filename, name, color in companies:
    # Create image with transparent background
    img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Convert hex color to RGB tuple
    hex_color = color.lstrip('#')
    rgb_color = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    rgb_with_alpha = rgb_color + (255,)  # Add alpha channel
    
    # Draw a colored circle background
    draw.ellipse([4, 4, 60, 60], fill=rgb_with_alpha, outline=rgb_with_alpha)
    
    # Draw text (first letter)
    try:
        font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    first_letter = name[0].upper()
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), first_letter, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (64 - text_width) // 2
    y = (64 - text_height) // 2 - 2
    
    draw.text((x, y), first_letter, fill='white', font=font)
    
    # Save the image
    filepath = f"public/{filename}"
    img.save(filepath, 'PNG')
    print(f"Created {filepath}")

print("All placeholder images created successfully!")
