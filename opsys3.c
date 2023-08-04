#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/msg.h>
#include <string.h>

#define MSG_SIZE 100

#define MAX_NAME_LEN 20
#define NUM_DAYS 5
#define MAX_PEOPLE 10
#define MAX_FILENAME_LEN 15
#define MAX_LINE_LENGTH 30

#define MAX_PEOPLE_MONDAY 6
#define MAX_PEOPLE_TUESDAY 3
#define MAX_PEOPLE_WEDNESDAY 10
#define MAX_PEOPLE_THURSDAY 4
#define MAX_PEOPLE_FRIDAY 8

typedef struct
{
    char name[MAX_NAME_LEN];
    int availability[NUM_DAYS];
} Person;

char weekdays[NUM_DAYS][MAX_NAME_LEN] = {
    "hétfő", "kedd", "szerda", "csütörtök", "péntek"};

int find_person(Person people[], int num_people, char name[])
{
    for (int i = 0; i < num_people; i++)
    {
        if (strcmp(people[i].name, name) == 0)
        {
            return i;
        }
    }
    return -1;
}

int load_schedule(Person people[], int *num_people, char filename[])
{
    FILE *file = fopen(filename, "r");
    if (file == NULL)
    {
        return -1;
    }

    char line[MAX_LINE_LENGTH];
    char *name;
    char *day;
    while (fgets(line, MAX_LINE_LENGTH, file) != NULL)
    {
        name = strtok(line, " \t\n");
        int i = find_person(people, *num_people, name);
        if (i == -1)
        {
            strcpy(people[*num_people].name, name);
            for (int j = 0; j < NUM_DAYS; j++)
            {
                people[*num_people].availability[j] = 0;
            }
            i = (*num_people)++;
        }
        day = strtok(NULL, " \t\n");
        while (day != NULL)
        {
            for (int j = 0; j < NUM_DAYS; j++)
            {
                if (strcmp(weekdays[j], day) == 0)
                {
                    people[i].availability[j] = 1;
                    break;
                }
            }
            day = strtok(NULL, " \t\n");
        }
    }

    fclose(file);
    return 0;
}

int add_person(Person people[], int *num_people, char name[], int availability[])
{
    if (*num_people == MAX_PEOPLE)
    {
        return -1;
    }
    strcpy(people[*num_people].name, name);
    memcpy(people[*num_people].availability, availability, sizeof(int) * NUM_DAYS);
    (*num_people)++;
    return 0;
}

int count_people_on_day(Person people[], int num_people, int day)
{
    int count = 0;
    for (int i = 0; i < num_people; i++)
    {
        if (people[i].availability[day] == 1)
        {
            count++;
        }
    }
    return count;
}

int edit_person(Person people[], int num_people)
{

    //

    char name[MAX_NAME_LEN];
    int availability[NUM_DAYS] = {0};

    char line[100];
    char rest_words[50][20];

    printf("Enter name then days: ");
    scanf(" %[^\n]", line);

    line[strcspn(line, "\n")] = '\0';

    sscanf(line, "%s", name);

    char *token = strtok(line, " ");
    int index = 0;
    while (token != NULL)
    {
        token = strtok(NULL, " ");
        if (token != NULL)
        {
            strcpy(rest_words[index], token);
            index++;
        }
    }

    for (int i = 0; i < index; i++)
    {
        for (int j = 0; j < 5; j++)
        {
            if (strcmp(rest_words[i], weekdays[j]) == 0)
            {
                availability[j] = 1;
            }
        }
    }

    //

    int person_index = find_person(people, num_people, name);
    if (person_index == -1)
    {
        printf("Person not found\n");
        return -1;
    }

    // printf("Enter new availability (0 = not available, 1 = available):\n");
    for (int i = 0; i < NUM_DAYS; i++)
    {
        // printf("%s: ", weekdays[i]);
        // scanf("%d", &availability[i]);

        int max_people_for_day = 0;
        switch (i)
        {
        case 0:
            max_people_for_day = MAX_PEOPLE_MONDAY;
            break;
        case 1:
            max_people_for_day = MAX_PEOPLE_TUESDAY;
            break;
        case 2:
            max_people_for_day = MAX_PEOPLE_WEDNESDAY;
            break;
        case 3:
            max_people_for_day = MAX_PEOPLE_THURSDAY;
            break;
        case 4:
            max_people_for_day = MAX_PEOPLE_FRIDAY;
            break;
        }

        if (availability[i] == 1 && count_people_on_day(people, num_people, i) >= max_people_for_day)
        {
            printf("Error: maximum amount of people for %s already reached\n", weekdays[i]);
            return -1;
        }
    }

    memcpy(people[person_index].availability, availability, NUM_DAYS * sizeof(int));
    return 0;
}

int delete_person(Person people[], int *num_people)
{
    char name[MAX_NAME_LEN];
    printf("Enter name of person to delete: ");
    scanf("%s", name);
    int index = find_person(people, *num_people, name);
    if (index == -1)
    {
        return -1;
    }
    for (int i = index; i < *num_people - 1; i++)
    {
        strcpy(people[i].name, people[i + 1].name);
        memcpy(people[i].availability, people[i + 1].availability, sizeof(int) * NUM_DAYS);
    }
    (*num_people)--;
    return 0;
}

void view_schedule(Person people[], int num_people)
{
    printf("Schedule:\nName\thétfő\tkedd\tszerda\tcsüt\tpéntek\n");
    for (int i = 0; i < num_people; i++)
    {
        printf("%s\t", people[i].name);
        for (int j = 0; j < NUM_DAYS; j++)
        {
            printf("%d\t", people[i].availability[j]);
        }
        printf("\n");
    }
}

int save_schedule(Person people[], int num_people, char filename[])
{
    FILE *fp;
    fp = fopen(filename, "w");
    if (fp == NULL)
    {
        return -1;
    }
    for (int i = 0; i < num_people; i++)
    {
        fprintf(fp, "%s\t", people[i].name);
        for (int j = 0; j < NUM_DAYS; j++)
        {
            if (people[i].availability[j] == 1)
            {
                fprintf(fp, "%s ", weekdays[j]);
            }
        }
        fprintf(fp, "\n");
    }
    fclose(fp);
    return 0;
}

int main()
{
    Person people[MAX_PEOPLE];
    int num_people = 0;
    char filename[MAX_FILENAME_LEN] = "schedule.txt";

    if (load_schedule(people, &num_people, filename) != 0)
    {
        printf("Error: could not load schedule from file %s\n", filename);
    }

    int choice;

    Person selectedppl[MAX_PEOPLE];
    int selectedday = 0;
    do
    {
        printf("1. Add person\n");
        printf("2. Edit person\n");
        printf("3. Delete person\n");
        printf("4. View schedule\n");
        printf("5. Start buses\n");
        printf("6. Save and exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
        {
            char name[MAX_NAME_LEN];
            int availability[NUM_DAYS] = {0};

            char line[100];
            char rest_words[50][20];

            printf("Enter name then days: ");
            scanf(" %[^\n]", line);

            line[strcspn(line, "\n")] = '\0';

            sscanf(line, "%s", name);

            char *token = strtok(line, " ");
            int index = 0;
            while (token != NULL)
            {
                token = strtok(NULL, " ");
                if (token != NULL)
                {
                    strcpy(rest_words[index], token);
                    index++;
                }
            }

            for (int i = 0; i < index; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    if (strcmp(rest_words[i], weekdays[j]) == 0)
                    {
                        availability[j] = 1;
                    }
                }
            }
            for (int i = 0; i < NUM_DAYS; i++)
            {

                int max_capacity = 0;
                switch (i)
                {
                case 0:
                    max_capacity = MAX_PEOPLE_MONDAY;
                    break;
                case 1:
                    max_capacity = MAX_PEOPLE_TUESDAY;
                    break;
                case 2:
                    max_capacity = MAX_PEOPLE_WEDNESDAY;
                    break;
                case 3:
                    max_capacity = MAX_PEOPLE_THURSDAY;
                    break;
                case 4:
                    max_capacity = MAX_PEOPLE_FRIDAY;
                    break;
                }
                int num_available = 0;
                for (int j = 0; j < num_people; j++)
                {
                    if (people[j].availability[i] == 1)
                    {
                        num_available++;
                    }
                }
                if (availability[i] == 1 && num_available >= max_capacity)
                {
                    printf("Error: maximum capacity reached for %s. Cannot add more people.\n", weekdays[i]);
                    availability[i] = 0;
                }
            }
            if (add_person(people, &num_people, name, availability) != 0)
            {
                printf("Error: could not add person\n");
            }
        }
        break;
        case 2:
            if (edit_person(people, num_people) != 0)
            {
                printf("Error: could not edit person\n");
            }
            break;
        case 3:
            if (delete_person(people, &num_people) != 0)
            {
                printf("Error: could not delete person\n");
            }
            break;
        case 4:
            view_schedule(people, num_people);
            break;
        case 5:

            printf("Enter current day: (0-4)\n");
            scanf("%d", &selectedday);

            int iterator = 0;

            for (size_t i = 0; i < num_people; i++)
            {
                if (people[i].availability[selectedday] == 1)
                {
                    selectedppl[iterator] = people[i];
                    iterator++;
                    // printf("%d", iterator);
                }
            }

            // 2. bead
            typedef struct message
            {
                long mtype;
                char mtext[MSG_SIZE];
            } message;

            int msgid;
            int pipe1[2], pipe2[2];
            char busz1[80] = "";
            char busz2[80] = "";

            void signal_handler_for_child1(int sig)
            {
                write(pipe1[1], busz1, strlen(busz1) + 1);
                close(pipe1[1]);
            }

            void signal_handler_for_child2(int sig)
            {
                write(pipe2[1], busz2, strlen(busz2) + 1);
                close(pipe2[1]);
            }

            for (size_t i = 0; i < iterator; i++)
            {
                if (i <= 4)
                {
                    strcat(busz1, strcat(selectedppl[i].name, " "));
                }
                else
                {
                    strcat(busz2, strcat(selectedppl[i].name, " "));
                }
            }

            // strcat(busz1, "\n");
            // strcat(busz2, "\n");

            pid_t child1, child2;
            message msg;

            if (pipe(pipe1) == -1 || pipe(pipe2) == -1)
            {
                perror("pipe");
                exit(1);
            }

            msgid = msgget(IPC_PRIVATE, 0666 | IPC_CREAT);
            if (msgid == -1)
            {
                perror("msgget");
                exit(1);
            }

            signal(SIGUSR1, signal_handler_for_child1);
            signal(SIGUSR2, signal_handler_for_child2);
            // printf("parent id: %d\n", getpid());

            child1 = fork();
            if (child1 == 0)
            {
                // printf("child1 id: %d\n", getpid());
                kill(getppid(), SIGUSR1);
                printf("Az 1. busz készen áll az indulásra.\n");
                sleep(2);
                close(pipe1[1]);
                read(pipe1[0], msg.mtext, MSG_SIZE);
                msg.mtype = 1;
                msgsnd(msgid, &msg, strlen(msg.mtext) + 1, 0);
                exit(0);
            }

            child2 = fork();
            if (child2 == 0)
            {
                sleep(1);
                // printf("child2 id: %d\n", getpid());
                kill(getppid(), SIGUSR2);
                printf("Az 2. busz készen áll az indulásra.\n");
                sleep(1);
                close(pipe2[1]);
                read(pipe2[0], msg.mtext, MSG_SIZE);
                msg.mtype = 2;
                msgsnd(msgid, &msg, strlen(msg.mtext) + 1, 0);
                exit(0);
            }

            wait(NULL);
            wait(NULL);

            msgrcv(msgid, &msg, MSG_SIZE, 1, 0);
            printf("Az 1. busz utasai megérkeztek: %s\n", msg.mtext);

            msgrcv(msgid, &msg, MSG_SIZE, 2, 0);
            printf("Az 2. busz utasai megérkeztek: %s\n", msg.mtext);

            msgctl(msgid, IPC_RMID, NULL);

            break;
        case 6:
            if (save_schedule(people, num_people, filename) != 0)
            {
                printf("Error: could not save schedule to file %s\n", filename);
            }
            printf("Schedule saved successfully. Exiting program...\n");
            break;
        default:
            printf("Invalid choice\n");
        }
    } while (choice != 6);

    return 0;
}
