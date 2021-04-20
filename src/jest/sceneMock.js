const MockScene = () => {
  const physics = {
    add: {
      sprite(startX, startY) {
        return {
          setScale() {},
          x: startX,
          y: startY,
          setActive() {
            return {
              setVisible() {},
            };
          },
        };
      },
    },
  };

  const add = {
    rectangle() {
      return {
        setOrigin() {
          return {
            setSize() {},
          };
        },
      };
    },
  };


  return { physics, add };
};

export default MockScene;