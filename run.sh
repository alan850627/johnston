#!/bin/bash

cents=0


while true
do
  read symbol

  case $symbol in

    3 | \#)
      echo $((cents+=70))
      ;;

    b)
      echo $((cents-=70))
      ;;

    = | +)
      echo $((cents+=22))
      ;;

    -)
      echo $((cents-=22))
      ;;

    l | L)
      echo $((cents+=49))
      ;;

    7)
      echo $((cents-=49))
      ;;

    u | U)
      echo $((cents+=53))
      ;;

    d | D)
      echo $((cents-=53))
      ;;

    13)
      echo $((cents+=27))
      ;;

    31)
      echo $((cents-=27))
      ;;

    *)
      cents=0
      ;;

  esac
done