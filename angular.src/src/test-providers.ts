import 'zone.js/testing';
import {provideZoneChangeDetection} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';

export default [
    provideZoneChangeDetection(),
    provideHttpClientTesting()
];
