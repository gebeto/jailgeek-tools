import wallpaper from './wallpaper/';
import Generator from './Generator';

import GeneratorsWrapper from './GeneratorsWrapper/';


const wrapper = new GeneratorsWrapper(document.querySelector('#generators-wrapper'));

wrapper.add(new wallpaper());
wrapper.add(new Generator());
// wrapper.add(new wallpaper());

wrapper.render();
