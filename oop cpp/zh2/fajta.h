#pragma once

class Fajta
{
public:
    virtual bool Is_Vill() = 0;
    virtual bool Is_Busz() = 0;
    virtual bool Is_Trolli() = 0;
    virtual int Faktor() = 0;
};

class Villamos : public Fajta {

private:
    Villamos() = default;
    static Villamos* storage;
public:
    bool Is_Vill() override { return true; }
    bool Is_Busz() override { return false; }
    bool Is_Trolli() override { return false; }
    int Faktor() { return 1; }

    static Villamos* instance(){
        if (storage == nullptr){
            storage = new Villamos;
        }
        return storage;
    }

    static void destroy() {
        if(storage != nullptr){
            delete storage;
        }
        storage = nullptr;
    }

public:
    
};

class Autobusz : public Fajta {

private:
    Autobusz() = default;
    static Autobusz* storage;
public:
    bool Is_Vill() override { return false; }
    bool Is_Busz() override { return true; }
    bool Is_Trolli() override { return false; }
    int Faktor() { return 3; }

    static Autobusz* instance(){
        if (storage == nullptr){
            storage = new Autobusz;
        }
        return storage;
    }

    static void destroy() {
        if(storage != nullptr){
            delete storage;
        }
        storage = nullptr;
    }
};

class Trolibusz : public Fajta {
private:
    Trolibusz() = default;
    static Trolibusz* storage;
public:
    bool Is_Vill() override { return false; }
    bool Is_Busz() override { return false; }
    bool Is_Trolli() override { return true; }
    int Faktor() { return 2; }

    static Trolibusz* instance(){
        if (storage == nullptr){
            storage = new Trolibusz;
        }
        return storage;
    }

    static void destroy() {
        if(storage != nullptr){
            delete storage;
        }
        storage = nullptr;
    }

    
};