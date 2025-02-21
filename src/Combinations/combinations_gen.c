//This program will generate the file "Combinations.json"
//The file contains all posible card combinations and whether they are valid
//A combination is valid if it has at least one solution
//The performance of this program is neglected as it has to be run locally only once

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

//0: +, 1: -, 2: *, 3: /
//4: pow, 5: root, 6: log
double op(double x, double y, int number) {
    switch (number) {
        case 0:
            return x + y;
        case 1: 
            return x - y;
        case 2:
            return x * y;
        case 3:
            return x / y;
        case 4:
            return pow(x, y);
        case 5:
            return pow(y, 1.0 / x);
        case 6:
            return log(y) / log(x);
        default:
            fprintf(stderr, "op(): Invalid operation number: %d\n", number);
            exit(1);
    }
}

//Checks whether a particular combination is valid
char has_solution(int nums[4]) {
    int i, j, k;
    double ab, abc, abcd;
    //Try all possible operations
    for (i = 0; i < 7; i++) {
        ab = op((double) nums[0], (double) nums[1], i);
        for (j = 0; j < 7; j++) {
            abc = op(ab, (double) nums[2], j);
            for (k = 0; k < 7; k++) {
                abcd = op(abc, (double) nums[3], k);
                if (abcd == 24.0) 
                    return 1;
            }
        }
    }
    return 0;
}

int main() {
    char cache[12][12][12][12];
    double ab,abc,abcd;
    int i,j,progress,sorted[4],nums[4] = {1,1,1,1};
    unsigned char min, min_i, valid;
    FILE *fp = fopen("Combinations.json", "w");

    printf("Starting generation...\n");

    memset(cache, -1, sizeof(char)*12*12*12*12);

    //Open brackets
    fprintf(fp, "{\n");

    progress = 1;
    //Loop through every possible combination
    for (nums[0] = 1; nums[0] <= 12; nums[0]++) {
        for (nums[1] = 1; nums[1] <= 12; nums[1]++) {
            for (nums[2] = 1; nums[2] <= 12; nums[2]++) {
                for (nums[3] = 1; nums[3] <= 12; nums[3]++) {


                    //Sort the numbers
                    char used[4] = {0,0,0,0};
                    for (i = 0; i < 4; i++) {
                        min = 255;
                        for (j = 0; j < 4; j++) {
                            if ((nums[j] < min) && (used[j] == 0)) {
                                min = nums[j];
                                min_i = j;
                            }
                        }
                        sorted[i] = min;
                        used[min_i] = 1;
                    }

                    //Check if the combination is in the cache
                    //If it is not, update it
                    if (cache[nums[0]-1][nums[1]-1][nums[2]-1][nums[3]-1] == -1) {
                        valid = has_solution(nums);
                        cache[nums[0]-1][nums[1]-1][nums[2]-1][nums[3]-1] = valid;
                    } else {
                        valid = cache[nums[0]-1][nums[1]-1][nums[2]-1][nums[3]-1];
                    }

                    //Write the combination to the file
                    if (valid) {
                        fprintf(fp,"   \"%d %d %d %d\": true,\n",nums[0], nums[1], nums[2], nums[3]);
                    } else {
                        fprintf(fp,"   \"%d %d %d %d\": false,\n",nums[0], nums[1], nums[2], nums[3]);
                    }

                    //Show progress
                    printf("\rProgress: %d/20736.", progress);
                    fflush(stdout);
                    progress++;
                }
            }
        }
    }

    //Remove the comma in the last key-value pair and close the brackets
    fseek(fp, -2L, 1);
    fprintf(fp, "\n}\n");

    printf("\nDone!\n");
    return 0;
}
