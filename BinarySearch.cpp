//Binary search is used to find the postion of a certain value in a sorted array
//This is the algo that constantly splits in half until the value is found type shii
//This only works in SORTED arrays and access to elements of the data structure need to take constant time
//Generally the iterative version of BS is better
#include <iostream>
using namespace std;

int iterativeBinarySearch(int ar[], int low, int high, int target){
    while (low <= high){
        int mid = low + (high - low) / 2;
        if(ar[mid] == target){
            return mid;
        }
        if(ar[mid] < target){
            low = mid + 1;
        }
        else{
            high = mid - 1;
        }
    }
    return -1;
}

int recursiveBinarySearch(int ar[], int low, int high, int target){
    if (high >= low){
        int mid = low + (high - low) / 2;
        if(ar[mid] == target){
            return mid;
        }
        if(ar[mid] > target){
            return recursiveBinarySearch(ar, low, mid - 1, target);
        }
        return recursiveBinarySearch(ar, mid + 1, high, target);
    }
    return -1;
}