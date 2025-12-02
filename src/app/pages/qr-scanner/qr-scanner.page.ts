import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule]
})
export class QrScannerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/home'])
  }

  async onScan() {
    // Creamos un input file "al vuelo" para abrir cámara/galería
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    // En móviles intenta usar la cámara trasera
    (input as any).capture = 'environment';

    // Cuando el usuario escoja / tome la foto
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        console.log('No se seleccionó ninguna imagen');
        return;
      }

      try {
        // Leer la imagen como ImageData
        const imageData = await new Promise<ImageData>((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                reject(new Error('No se pudo crear el contexto 2D'));
                return;
              }
              ctx.drawImage(img, 0, 0, img.width, img.height);
              resolve(ctx.getImageData(0, 0, img.width, img.height));
            };
            img.onerror = reject;
            img.src = reader.result as string;
          };
          reader.readAsDataURL(file);
        });

        // Intentar leer el QR
        const qr = jsQR(imageData.data, imageData.width, imageData.height);
        if (!qr) {
          console.log('No se detectó ningún código QR en la imagen');
          return;
        }

        const codigo = qr.data;
        console.log('QR leído:', codigo);

        // TODO: aquí llamas tu API con el código leído
        // Ejemplo:
        const resp = await fetch(`https://tu-api.com/patrimonio/${codigo}`);
        if (!resp.ok) {
          console.log('Código no existe en la base de datos');
          return;
        }
        const data = await resp.json();
        console.log('Respuesta de la API:', data);

        // Aquí luego puedes guardar "data" en una propiedad
        // y mostrar el card en el template.

      } catch (e) {
        console.error('Error al procesar la imagen/QR:', e);
      }
    };

    // Disparamos el input (abre cámara/galería)
    input.click();
  }

  onWriteCode() {
    console.log('Escribir código');
  }

}
