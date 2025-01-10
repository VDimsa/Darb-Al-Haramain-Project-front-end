import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-iiif-test',
  templateUrl: './iiif-test.component.html',
  styleUrls: ['./iiif-test.component.scss']
})
export class IiifTestComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initOpenSeadragon();
    }
  }

  async initOpenSeadragon(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Dynamically import OpenSeadragon only in the browser
      const OpenSeadragon = await import('openseadragon');

      // IIIF manifest URL
      const manifestUrl = 'https://www.loc.gov/item/2011630080/manifest.json';

      // Fetch the manifest
      const response = await fetch(manifestUrl);
      const manifest = await response.json();

      // Extract the tile source URL from the manifest
      const tileSource = manifest.sequences[0].canvases[0].images[0].resource.service['@id'];

      // Initialize OpenSeadragon with the tile source
      OpenSeadragon.default({
        id: "openseadragon-viewer",
        prefixUrl: "https://tile.loc.gov/image-services/iiif/service:pnp:highsm:11800:11886/",
        tileSources: tileSource
      });
    }
  }
}