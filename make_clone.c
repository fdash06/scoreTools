/*   make_clone.c   */
#include <stdio.h>

void insert_csv(FILE *f2, FILE *f3);

int main(int argc, char *argv[]){
  int c, flag;
  FILE *f1, *f2, *f3;

  if(argc != 4){
    printf("Usage %s htmlfile csvfile makefile\n",argv[0]);
    exit(1);
  }
    
  f1 = fopen(argv[1], "r");
  if(f1 == NULL){
    printf("cannot open %s\n" ,argv[1]);
    exit(1);
  }

  f2 = fopen(argv[2], "r");
  if(f2 == NULL){
    printf("cannot open %s\n" ,argv[2]);
    exit(1);
  }

  f3 = fopen(argv[3], "w");
  if(f3 == NULL){
    printf("cannot open %s\n" ,argv[3]);
    exit(1);
  }

  flag = 0;
  c = fgetc(f1);
  while(c != EOF){
    if(flag == 0 && c == '<' ||
       flag == 1 && c == '/' ||
       flag == 2 && c == 't' ||
       flag == 3 && c == 'r' ||
       flag == 4 && c == '>'){
      flag++;
    }
    else flag = 0;
    fprintf(f3, "%c",c);
    if(flag == 5){
      insert_csv(f2, f3);
    }
    c = fgetc(f1);
  }

  fclose(f1);
  fclose(f2);
  fclose(f3);

  return 0;
}

void insert_csv(FILE *f2, FILE *f3){
  int c;

  c = fgetc(f2);
  fprintf(f3, "\n<tr>\n<td>");
  while(c != EOF){
    if(c == ','){
      fprintf(f3, "\n<td>");
      c = fgetc(f2);
    }
    else if(c == '\n'){
      fprintf(f3, "\n<td>0");
      c = fgetc(f2);
      if(c == EOF) return;
      fprintf(f3, "\n<tr>\n<td>");
    }
    else{
      fprintf(f3, "%c", c);
      c = fgetc(f2);
    }
  }
}
