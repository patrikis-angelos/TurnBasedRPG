const MockScene = () => {
  let physics = {
    add: {
      sprite: function(startX, startY, name){
        return {
          setScale: function(){},
          x: startX,
          y: startY,
          setActive: function(){
            return {
              setVisible: function(){}
            }
          }
        }
      }
    }
  }

  let add = {
    rectangle: function() {
      return {
        setOrigin: function() {
          return {
            setSize: function() {},
          }
        },
      };
    }
  }


  return {physics, add};
}

export default MockScene;