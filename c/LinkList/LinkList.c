#include "LinkList.h"

void Listlog(ElemType item, int index) {
  printf("index: %d, value: %d\n", index, item);
}

char *status(Status i) {
  switch (i) {
    case -3:
      return "OVERFLOW";
    case -2:
      return "ERROR";
    case -1:
      return "OK";
    case 0:
      return "FALSE";
    case 1:
      return "TRUE";
    default:
      break;
  }
  return "";
}

int main(int argc, char *argv[]) {
  LinkList *L = (LinkList *) malloc(sizeof(LinkList));

  printf("初始化列表: %s\n", status(InitList(L)));

  printf("\nListEmpty: %s\n", status(ListEmpty(*L)));

  printf("ListInsert 位置： %d 值： %d %s\n", 0, 0, status(ListInsert(L, 0, 0)));
  printf("ListInsert 位置： %d 值： %d %s\n", 5, 1, status(ListInsert(L, 5, 1)));
  printf("ListInsert 位置： %d 值： %d %s\n", 1, 2, status(ListInsert(L, 1, 2)));
  printf("ListInsert 位置： %d 值： %d %s\n", 3, 4, status(ListInsert(L, 3, 4)));
  printf("ListInsert 位置： %d 值： %d %s\n", 5, 6, status(ListInsert(L, 5, 6)));
  printf("ListInsert 位置： %d 值： %d %s\n", 1, 2, status(ListInsert(L, 1, 2)));
  printf("ListInsert 位置： %d 值： %d %s\n", 0, 3, status(ListInsert(L, 0, 3)));
  printf("ListInsert 位置： %d 值： %d %s\n", 4, 5, status(ListInsert(L, 4, 5)));

  printf("\n测试 LsitTraverse 正序遍历\n");
  LsitTraverse(*L, Listlog);
  printf("\n测试 LsitReverseTraverse 逆序遍历\n");
  LsitReverseTraverse(*L, Listlog);

  printf("\n测试 ListLength: %d\n", ListLength(*L));
  printf("\n测试 ListEmpty: %s\n", status(ListEmpty(*L)));

  ElemType e;
  printf("\n测试 GetElem %d 号: %s\n", 5, status(GetElem(*L, 5, &e)));
  printf("测试 GetElem %d 号: %s\n", 0, status(GetElem(*L, 0, &e)));
  printf("取得结果为: %d\n", e);

  printf("\n测试 ListDelete 位置： %d %s\n", 5, status(ListDelete(L, 5, &e)));
  printf("测试 ListDelete 位置： %d %s\n", 4, status(ListDelete(L, 4, &e)));
  printf("取得结果为: %d\n", e);
  LsitTraverse(*L, Listlog); 
  printf("\n测试 ListDelete 位置： %d %s\n", 0, status(ListDelete(L, 0, &e)));
  printf("取得结果为: %d\n", e);
  LsitTraverse(*L, Listlog);
  printf("\n测试 ListDelete 位置： %d %s\n", 2, status(ListDelete(L, 2, &e)));
  printf("取得结果为: %d\n", e);
  LsitTraverse(*L, Listlog);
  
  printf("\nListInsert 位置： %d 值： %d %s\n", 0, 11, status(ListInsert(L, 0, 11)));
  printf("ListInsert 位置： %d 值： %d %s\n", 1, 22, status(ListInsert(L, 1, 22)));
  printf("ListInsert 位置： %d 值： %d %s\n", 1, 33, status(ListInsert(L, 1, 33)));
  printf("ListInsert 位置： %d 值： %d %s\n", 0, 44, status(ListInsert(L, 0, 44)));
  LsitTraverse(*L, Listlog);  
  printf("\n测试 LocateElem 99的位置为 %d\n", LocateElem(*L, 99));
  printf("\n测试 LocateElem 0的位置为 %d\n", LocateElem(*L, 0));
  printf("\n测试 LocateElem 33的位置为 %d\n", LocateElem(*L, 33));

  
  printf("\n测试 PriorElem 测试值： %d %s\n", 99, status(PriorElem(*L, 99, &e)));
  printf("测试 PriorElem 测试值： %d %s\n", 44, status(PriorElem(*L, 44, &e)));
  printf("测试 PriorElem 测试值： %d %s\n", 33, status(PriorElem(*L, 33, &e)));
  printf("取得结果为: %d\n", e);

  printf("\n测试 NextElem 测试值： %d %s\n", 2, status(NextElem(*L, 2, &e)));
  printf("\n测试 NextElem 测试值： %d %s\n", 0, status(NextElem(*L, 0, &e)));
  printf("取得结果为: %d\n", e);
    
  printf("\n测试 DestroyList: %s\n", status(DestroyList(L)));
}