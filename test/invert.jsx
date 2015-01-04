var src = new File(arguments[0]);
var dest = new File(arguments[1]);
var doc = open(src);
var pngOpts = new ExportOptionsSaveForWeb();
pngOpts.format = SaveDocumentType.PNG;
pngOpts.PNG8 = false;
pngOpts.transparency = false;
pngOpts.interlaced = false;
pngOpts.quality = 100;

doc.artLayers[0].invert();

doc.exportDocument(dest, ExportType.SAVEFORWEB, pngOpts);

doc.close(SaveOptions.DONOTSAVECHANGES);