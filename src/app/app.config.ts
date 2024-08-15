import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'join-2-65b0d',
        appId: '1:237640662240:web:ffc06559dcca509b816485',
        storageBucket: 'join-2-65b0d.appspot.com',
        apiKey: 'AIzaSyA_Sx899KbqM_wGg8D2qat-IIeXNgBqNus',
        authDomain: 'join-2-65b0d.firebaseapp.com',
        messagingSenderId: '237640662240',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"join-2-65b0d","appId":"1:237640662240:web:ffc06559dcca509b816485","storageBucket":"join-2-65b0d.appspot.com","apiKey":"AIzaSyA_Sx899KbqM_wGg8D2qat-IIeXNgBqNus","authDomain":"join-2-65b0d.firebaseapp.com","messagingSenderId":"237640662240"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
  ],
};
