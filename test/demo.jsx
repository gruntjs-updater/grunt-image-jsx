var src = new File(arguments[0]);
var dest = new File(arguments[1]);
var action = (arguments.length > 2) ? arguments[2] : null;
var param = (arguments.length > 3) ? arguments[3] : null;
var doc = open(src);
var pngOpts = new ExportOptionsSaveForWeb();
pngOpts.format = SaveDocumentType.PNG;
pngOpts.PNG8 = false;
pngOpts.transparency = false;
pngOpts.interlaced = false;
pngOpts.quality = 100;

switch (action) {
	case 'invert':
		doc.artLayers[0].invert();
		break;
	case 'resize':
		doc.resizeImage(UnitValue(param, 'px'), null, null, ResampleMethod.NEARESTNEIGHBOR);
		break;
	default:
		throw new Error('No action given');
}

doc.exportDocument(dest, ExportType.SAVEFORWEB, pngOpts);

doc.close(SaveOptions.DONOTSAVECHANGES);
