import {
    initializeApp,
    getApps,
    App, getApp, cert
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import servicekey from './service-key.json';

let app: App;

if (!getApps().length) {
    app = initializeApp({
        credential: cert(servicekey as any),
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb }