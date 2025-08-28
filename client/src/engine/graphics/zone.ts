import { Engine, LoadSceneAsync } from '@babylonjs/core';

export const renderZoneFile = async (zoneFilename: string, engine: Engine): Promise<void> => {
  LoadSceneAsync(`${process.env.SERVER_FILE_URL}:${process.env.SERVER_FILE_PORT}/models/zones/${zoneFilename}`, engine).then((scene) => {
        console.log(scene)
        scene.activeCamera = scene.cameras[0]
        scene.activeCamera.attachControl()
        
        // scene.lights.forEach(light => {
        //   light.intensity = 20;
        // })
        engine.runRenderLoop( () => {
          scene.render();
        });
        window.addEventListener('keydown', (ev) => {
        // Shift+Ctrl+I
        if (ev.shiftKey && ev.ctrlKey && ev.key === 'I') {
          if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
          } else {
            scene.debugLayer.show();
          }
        }
    });
      })
}

