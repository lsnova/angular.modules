import '@angular/compiler';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

const testProviders = [provideHttpClient(), provideHttpClientTesting()];

export default testProviders;
