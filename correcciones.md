- La función `update()` realmente no hace nada, podría no estar:

  - `checkWallPlayer()` y `checkWallPC()` están mal implementadas; no retornan nada, por ende `isBlockMovePlayer` e `isBlockMovePc` siempre tienen el valor de `undefined` entonces nunca retorna el `update()` cuando debería. También -como posible _refactor_ del código- podrían ser la misma función con la diferencia de que recibiría por parámetro el elemento (**PC** o **Player**) que tiene que verificar si chocó con una de las paredes.

- `futureX` y `futureY` nunca dejan de valer 0, sería lo mismo que no existieran.

- `drawThingPlayer()` y `drawThingPC()` son la misma función con otro nombre, podrían ser una sola y usarse dos veces recibiendo parámetros diferentes. Incluso `drawThingBall()` también.

- **Es imposible ganar porque el valor de X de la pelota y de la PC es siempre el mismo**.
  - No puedo aprobar un juego en el que no se puede ganar, está sin terminar 😔
