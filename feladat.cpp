#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

bool contains (vector<string> v, string s){
    bool a = false;
    for (int i = 0; i < v.size(); ++i) {
        if (v[i]==s){
            return true;
        }
    }
    return false;
}

int main() {
    int t, ny;
    cin >> t >> ny;

    vector<string> hely[t];

    vector<string> helyekegyszer;
    for (int i = 0; i < ny; ++i) {
        int temp;
        string s;
        cin >> temp;
        cin >> s;

        hely[temp-1].push_back(s);
        helyekegyszer.push_back(s);
    }

    sort( helyekegyszer.begin(), helyekegyszer.end() );
    helyekegyszer.erase( unique( helyekegyszer.begin(), helyekegyszer.end() ), helyekegyszer.end() );

    cout << "#" << endl;
    cout << helyekegyszer.size() << endl;
    cout << "#" << endl;
    for (int i = 0; i < t; ++i) {
        if (hely[i].size()!=0){
            cout << i+1 << " " << hely[i].size() << endl;
        }
    }
    cout << "#" << endl;

    int max = 0;
    string maxs;
    for (int i = 0; i < helyekegyszer.size(); ++i) {
        int szamol = 0;
        for (int j = 0; j < t; ++j) {
            if (contains(hely[j],helyekegyszer[i])){
                szamol++;
            }
        }
        if (szamol>max){
            max = szamol;
            maxs = helyekegyszer[i];
        }
    }

    cout << maxs << endl;


    cout << "#" << endl;

    bool vane = false;
    for (int i = 0; i < t; ++i) {
        if (hely[i].size()==0){
            cout << i+1 << endl;
            vane = true;
            break;
        }
    }
    if (!vane){
        cout << -1 << endl;
    }
    cout << "#" << endl;

    vector<vector<string>> vektorok;

    for (int i = 0; i < t; ++i) {
        if (!hely[i].empty()){
            vektorok.push_back(hely[i]);
        }
    }

    for (int i = 0; i < vektorok.size(); ++i) {
        sort( vektorok[i].begin(), vektorok[i].end() );
        vektorok[i].erase( unique( vektorok[i].begin(), vektorok[i].end() ), vektorok[i].end() );
    }

    sort( vektorok.begin(), vektorok.end() );
    vektorok.erase( unique( vektorok.begin(), vektorok.end() ), vektorok.end() );

    cout << vektorok.size() << endl;






    return 0;
}
