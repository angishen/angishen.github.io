---
layout: project
title: Eigenface Facial Recognition
slideshow:
 - image: StretchPrincipal.png
 - image: FirstTwentyStretched.png
 - image: MeanCenteredStretch.png
 - image: ReconstructionStretch.png
links:
 - title: Source on Github
   url: https://github.com/AustinStoneProjects/Eigenface-Recognition
---

## About

This is a project I completed as an open ended, final class project for an undergraduate [course](http://www.cs.utexas.edu/~pradeepr/courses/SLDM/Syllabus.pdf) in datamining. The goals of this project were (1) given a new, unknown image, determine if the image is a face, (2) if the image is a face, determine which direction it is looking, and (3) if the image is a face that has been seen before (perhaps in a different orientation), report that the face has been seen before. The final goal (4) is to optimize speed of this process.

To achieve this, I built off an idea for facial recognition known as the [Eigenface Method](https://en.wikipedia.org/wiki/Eigenface). This method is particularly notable for its speed of processing and its simplicity. One of its caveats is that it is known to be somewhat lacking in ability to capture faces at odd orientations. My implementation explicitly addresses this issue and has more success detecting faces at off center orientations than the conventional method.

The basic idea behind my approach is to discover a low dimensional representation of a large database of faces in order to allow fast comparison between a new input image and the database of faces. The axes in this low dimensional space are referred to as "Eigenfaces," some of which can be seen in the slides above.

To read the paper I wrote fully describing my method and results, please click [here](/eigenface_paper).

## Technologies

* Matlab