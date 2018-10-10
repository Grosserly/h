# h

My custom version of [finalboss.org/h/](finalboss.org/h/), (in)complete with different pages and a MowtenDoo reference.

Unfortunately, it is impossible to download `.php` files you don't own, so I can't get the orignal's `text.php`. I am currently working on my own solution to make custom text.

The main difference between this and the original is that the original had hardcoded `div`s that offset the rainbow background. This version uses JavaScript to generate as many `div`s the browser needs to fit the whole page, even when zoomed out to 25%. This change not only leads to more customizability, but it also reduces file size compared to the original. Furthermore, the original's file size would grow with the more `div`s added. When they are generated with JavaScript, the file size stays the same, no matter how many `div`s are requested.

  Offset background                    |  Not-offset background
:-------------------------------------:|:-------------------------------------:
  ![Offset background](offset.png)     |  ![Not-offset background](not-offset.png)



<sub>I didn't make [finalboss.org/h/](finalboss.org/h/) pls no sue</sub>
