/**
 * Created by G510 on 2016/9/13.
 */
var mongoose = require('mongoose');
var zoneSchema = require('../schemas/SMZone');
var Zone = mongoose.model('Zone', zoneSchema);

exports.Zone = Zone;